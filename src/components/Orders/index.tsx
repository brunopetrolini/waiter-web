import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Socket from 'socket.io-client';

import type { Order } from '../../types/order';
import { api, BASE_URL } from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      async function fetchOrders() {
        const response = await api.get('/orders');
        setOrders(response.data);
      }
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao buscar pedidos');
    }
  }, []);

  useEffect(() => {
    const socket = Socket(BASE_URL, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order: Order) => {
      setOrders((prevState) => prevState.concat(order));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleCancelOrder(orderId: string) {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  }

  function handleChangeOrderStatus(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (order._id === orderId ? { ...order, status } : order)));
  }

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  return (
    <Container>
      <OrdersBoard
        title="Fila de espera"
        icon="⏰"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChanceOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        title="Em preparação"
        icon="👨‍🍳"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChanceOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        title="Pronto!"
        icon="✅"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChanceOrderStatus={handleChangeOrderStatus}
      />
    </Container>
  );
}
