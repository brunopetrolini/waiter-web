import type { Order } from '../../types/order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
  {
    _id: '1',
    table: 'Mesa 4',
    status: 'WAITING',
    products: [
      {
        _id: '1',
        quantity: 2,
        product: {
          name: 'Pizza de calabresa',
          imagePath: 'https://placehold.co/50',
          price: 20,
        },
      },
    ],
  },
  {
    _id: '2',
    table: 'Mesa 7',
    status: 'WAITING',
    products: [
      {
        _id: '1',
        quantity: 2,
        product: {
          name: 'Pizza de calabresa',
          imagePath: 'https://placehold.co/50',
          price: 20,
        },
      },
    ],
  },
  {
    _id: '3',
    table: 'Mesa 1',
    status: 'WAITING',
    products: [
      {
        _id: '1',
        quantity: 2,
        product: {
          name: 'Pizza de calabresa',
          imagePath: 'https://placehold.co/50',
          price: 20,
        },
      },
    ],
  },
  {
    _id: '4',
    table: 'Mesa 5',
    status: 'IN_PRODUCTION',
    products: [
      {
        _id: '1',
        quantity: 2,
        product: {
          name: 'Pizza de calabresa',
          imagePath: 'https://placehold.co/50',
          price: 20,
        },
      },
    ],
  },
  {
    _id: '5',
    table: 'Mesa 8',
    status: 'DONE',
    products: [
      {
        _id: '1',
        quantity: 2,
        product: {
          name: 'Pizza de calabresa',
          imagePath: 'https://placehold.co/50',
          price: 20,
        },
      },
    ],
  },
  {
    _id: '6',
    table: 'Mesa 2',
    status: 'DONE',
    products: [
      {
        _id: '1',
        quantity: 2,
        product: {
          name: 'Pizza de calabresa',
          imagePath: 'https://placehold.co/50',
          price: 20,
        },
      },
    ],
  },
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard title="Fila de espera" icon="⏰" orders={orders.filter((order) => order.status === 'WAITING')} />
      <OrdersBoard
        title="Em preparação"
        icon="👨‍🍳"
        orders={orders.filter((order) => order.status === 'IN_PRODUCTION')}
      />
      <OrdersBoard title="Pronto!" icon="✅" orders={orders.filter((order) => order.status === 'DONE')} />
    </Container>
  );
}
