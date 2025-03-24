import type { Order } from '../../types/order';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  return (
    <Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      <OrdersContainer>
        {orders.map((order) => (
          <button type="button">
            <strong>{order.table}</strong>
            <span>
              {order.products.length !== 1 ? `${order.products.length} itens` : `${order.products.length} item`}
            </span>
          </button>
        ))}
      </OrdersContainer>
    </Board>
  );
}
