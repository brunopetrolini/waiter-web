import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/order';
import { BASE_URL } from '../../utils/api';
import { formatCurrency } from '../../utils/format-currency';
import { Actions, Container, OrderDetails, Overlay } from './styles';

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
  visible?: boolean;
}

export function OrderModal({ onClose, order, visible = false }: OrderModalProps) {
  if (!visible || !order) return null;

  const orderStatus = {
    WAITING: { icon: '⏰', label: 'Fila de espera' },
    IN_PRODUCTION: { icon: '👩‍🍳', label: 'Em produção' },
    DONE: { icon: '✅', label: 'Pronto!' },
  };

  const total = order.products.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

  return (
    <Overlay>
      <Container>
        <header>
          <strong>{order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>{orderStatus[order.status]['icon']}</span>
            <strong>{orderStatus[order.status]['label']}</strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img src={`${BASE_URL}/uploads/${product.imagePath}`} alt={product.name} />
                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button type="button" className="primary">
            <span>👩‍🍳</span>
            <strong>Iniciar produção</strong>
          </button>

          <button type="button" className="secondary">
            <strong>Cancelar pedido</strong>
          </button>
        </Actions>
      </Container>
    </Overlay>
  );
}
