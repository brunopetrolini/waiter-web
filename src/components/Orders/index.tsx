import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders = {
  waiting: [
    {
      table: 'Mesa 4',
      quantity: 2,
    },
    {
      table: 'Mesa 7',
      quantity: 1,
    },
    {
      table: 'Mesa 1',
      quantity: 5,
    },
  ],
  inProduction: [
    {
      table: 'Mesa 5',
      quantity: 5,
    },
  ],
  done: [
    {
      table: 'Mesa 8',
      quantity: 2,
    },
    {
      table: 'Mesa 2',
      quantity: 1,
    },
  ],
};

export function Orders() {
  return (
    <Container>
      <OrdersBoard title="Fila de espera" icon="⏰" orders={orders.waiting} />
      <OrdersBoard title="Em preparação" icon="👨‍🍳" orders={orders.inProduction} />
      <OrdersBoard title="Pronto!" icon="✅" orders={orders.done} />
    </Container>
  );
}
