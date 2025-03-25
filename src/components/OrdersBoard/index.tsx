import { useState } from 'react';

import type { Order } from '../../types/order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal order={selectedOrder} onClose={handleCloseModal} visible={isModalVisible} />

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
