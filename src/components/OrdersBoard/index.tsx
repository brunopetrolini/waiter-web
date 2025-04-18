import { useState } from 'react';
import { toast } from 'react-toastify';

import type { Order } from '../../types/order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChanceOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChanceOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    try {
      await api.delete(`/orders/${selectedOrder!._id}`);
      onCancelOrder(selectedOrder!._id);
      toast.success(`O pedido da mesa ${selectedOrder!.table} foi cancelado com sucesso!`);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao cancelar o pedido da mesa ${selectedOrder!.table}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);
    try {
      const newStatus = selectedOrder!.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
      await api.patch(`/orders/${selectedOrder!._id}`, { status: newStatus });
      toast.success(`O status do pedido da mesa ${selectedOrder!.table} foi alterado!`);
      onChanceOrderStatus(selectedOrder!._id, newStatus);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao alterar o status do pedido da mesa ${selectedOrder!.table}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Board>
      <OrderModal
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        isLoading={isLoading}
        visible={isModalVisible}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button key={order._id} type="button" onClick={() => handleOpenModal(order)}>
              <strong>{order.table}</strong>
              <span>
                {order.products.length !== 1 ? `${order.products.length} itens` : `${order.products.length} item`}
              </span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
