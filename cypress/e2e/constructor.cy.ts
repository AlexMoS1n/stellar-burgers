beforeEach(function () {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'ingredients'
  );
  cy.intercept('GET', 'api/orders/all', { fixture: 'feed.json' }).as('feed');
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
  cy.setCookie('accessToken', 'mockAccessTokenForJohnT');
  localStorage.setItem('refreshToken', 'mockRefreshTokenForJohnT');
  cy.visit('/');
  cy.wait(['@ingredients', '@user']);
});

describe('Проверка работы с конструктором', function () {
  beforeEach(function () {
    //В этом сборнике тестов, также добавил проверку на отсутсвие модального окна
    cy.get('#modals').should('be.empty');
  });
  it('проверка добавления булки', function () {
    // Перед добавлением конкретной булки проверим ее отсутсвие в конструкторе
    cy.get('[data-cy="constructor-section"]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    //Добавим булку путем клика по соответсвующей кнопке "Добавить"
    cy.get('h3')
      .contains('Булки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();
    // Теперь убедимся, что конкретная булка добавилась способом из начала теста
    cy.get('[data-cy="constructor-section"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
  // Процессы добавления и проверки начинки и сосуса схожи из теста с булкой
  it('проверка добавления начинки', function () {
    cy.get('[data-cy="constructor-section"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('h3')
      .contains('Начинки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();
    cy.get('[data-cy="constructor-section"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });
  it('проверка добавления соуса', function () {
    cy.get('[data-cy="constructor-section"]')
      .contains('Соус Spicy-X')
      .should('not.exist');
    cy.get('h3')
      .contains('Соусы')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();
    cy.get('[data-cy="constructor-section"]')
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('Проверка работы модальных окон', function () {
  beforeEach(function () {
    //Перед началом проверим, что модальное окно еще не открыто
    cy.get('#modals').should('be.empty');
    //Теперь открываем модальное окно
    cy.get('ul').find('[href^="/ingredients"]').first().click();
  });
  it('проверка открытия модального окна ингридиента и его содержимого', function () {
    cy.get('#modals').children().first().should('be.visible');
    cy.get('div')
      .find('h3')
      .contains('Детали ингредиента')
      .should('be.visible');
    cy.get('div').find('h3').contains('Краторная булка N-200i').should('exist');
    cy.get('#modals')
      .find('p')
      .contains('Калории, ккал')
      .next('p')
      .should('not.be.empty');
    cy.get('#modals')
      .find('p')
      .contains('Белки, г')
      .next('p')
      .should('not.be.empty');
    cy.get('#modals')
      .find('p')
      .contains('Жиры, г')
      .next('p')
      .should('not.be.empty');
    cy.get('#modals')
      .find('p')
      .contains('Жиры, г')
      .next('p')
      .should('not.be.empty');
    cy.get('#modals')
      .find('p')
      .contains('Углеводы, г')
      .next('p')
      .should('not.be.empty');
  });
  it('проверка закрытия модального окна кликом на крестик', function () {
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
  });
  it('проверка закрытия модального окна нажатием на esc', function () {
    cy.get('body').type('{esc}');
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
  });
  it('проверка закрытия модального окна кликом по оверлею', function () {
    cy.get('#modals').children().last().click('topLeft', { force: true });
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
  });
});
describe('Проверка оформления заказа', function () {
  beforeEach(function () {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.get('#modals').should('be.empty');
  });
  it('Проверка авторизации пользователя перед каждым тестом', function () {
    cy.get('p').contains('John Travolta').should('exist');
  });

  it('проверка процесса добавление ингридиентов для заказа и его оформление', function () {
    //добавление в заказ булки
    cy.get('[data-cy="constructor-section"]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('h3')
      .contains('Булки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();
    cy.get('[data-cy="constructor-section"]')
      .contains('Краторная булка N-200i')
      .should('exist');

    //добавление в заказ начинки
    cy.get('[data-cy="constructor-section"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('h3')
      .contains('Начинки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();
    cy.get('[data-cy="constructor-section"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    //добавим дополнительно соус
    cy.get('[data-cy="constructor-section"]')
      .contains('Соус Spicy-X')
      .should('not.exist');
    cy.get('h3')
      .contains('Соусы')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();
    cy.get('[data-cy="constructor-section"]')
      .contains('Соус Spicy-X')
      .should('exist');

    //Проверим, что нет пустых полей для создания бургера в конструкторе
    cy.get('div').contains('Выберите булки').should('not.exist');
    cy.get('div').contains('Выберите начинку').should('not.exist');

    //Кликаем по кнопке для оформления заказа
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@order');

    //Проверим открытие модального окна (еще одним способом)
    cy.get('#modals').should('not.be.empty');

    //Проверим номер заказа
    cy.get('#modals').find('h2').contains('2702').should('exist');

    //Закрываем модальное окно и проверяем, что оно закрылось
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');

    //Проверяем, что конструктор очистился
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('div').contains('Выберите начинку').should('exist');
  });
});
