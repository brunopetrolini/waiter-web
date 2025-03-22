import { Board, Container, OrdersContainer } from './styles';

export function Orders() {
  return (
    <Container>
      <Board>
        <header>
          <span>⏰</span>
          <strong>Fila de espera</strong>
          <span>(1)</span>
        </header>

        <OrdersContainer>
          <button type="button">
            <strong>Mesa 4</strong>
            <span>2 itens</span>
          </button>
          <button type="button">
            <strong>Mesa 7</strong>
            <span>1 itens</span>
          </button>
          <button type="button">
            <strong>Mesa 1</strong>
            <span>5 itens</span>
          </button>
        </OrdersContainer>
      </Board>

      <Board>
        <header>
          <span>🧑‍🍳</span>
          <strong>Em produção</strong>
          <span>(1)</span>
        </header>

        <OrdersContainer>
          <button type="button">
            <strong>Mesa 5</strong>
            <span>5 itens</span>
          </button>
        </OrdersContainer>
      </Board>

      <Board>
        <header>
          <span>✅</span>
          <strong>Pronto</strong>
          <span>(2)</span>
        </header>

        <OrdersContainer>
          <button type="button">
            <strong>Mesa 8</strong>
            <span>2 itens</span>
          </button>
          <button type="button">
            <strong>Mesa 2</strong>
            <span>1 itens</span>
          </button>
        </OrdersContainer>
      </Board>
    </Container>
  );
}
