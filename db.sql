create table produtos (
  id serial primary key auto_increment,
  nomeProduto varchar(250),
  marcaProduto varchar(100),
  codigoBarras varchar(13),
  quantidade numeric(10),
  validade date
);


insert into produtos (nomeProduto, marcaProduto, codigoBarras, quantidade, validade) values 'Arroz Integral', 'Carrefour', '7896543210123', 100, '2022-12-31';
insert into produtos (nomeProduto, marcaProduto, codigoBarras, quantidade, validade) values 'Feijão Carioca', 'Carrefour', '7896543210124', 100, '2022-12-31';
insert into produtos (nomeProduto, marcaProduto, codigoBarras, quantidade, validade) values 'Macarrão Espaguete', 'Carrefour', '7896543210125', 100, '2022-12-31';
insert into produtos (nomeProduto, marcaProduto, codigoBarras, quantidade, validade) values 'Azeite de Oliva', 'Carrefour', '7896543210126', 100, '2022-12-31';

