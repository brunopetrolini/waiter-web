import { Board, OrdersContainer } from './styles';

interface Order {
  table: string;
  quantity: number;
}

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
            <span>{order.quantity !== 1 ? `${order.quantity} itens` : `${order.quantity} item`}</span>
          </button>
        ))}
      </OrdersContainer>
    </Board>
  );
}
