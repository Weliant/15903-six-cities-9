function NotFoundPage(): JSX.Element {
  return (
    <main className="page__main page__main--favorites page__main--favorites-empty"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
      }}
    >
      <div style={{
        width: '300px',
      }}
      >
        <h1>404 Not Found</h1>
        <a href="/"> Вернуться на главную страницу</a>
      </div>
    </main>
  );
}

export default NotFoundPage;
