import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { Order } from '../../types/order';
import { api } from '../../utils/api';
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

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  return (
    <Container>
      <OrdersBoard title="Fila de espera" icon="⏰" orders={waiting} />
      <OrdersBoard title="Em preparação" icon="👨‍🍳" orders={inProduction} />
      <OrdersBoard title="Pronto!" icon="✅" orders={done} />
    </Container>
  );
}
