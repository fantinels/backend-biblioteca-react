-- Usuários
CREATE TABLE usuarios (
	user_id  SERIAL PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL
)

INSERT INTO usuarios (username, password) VALUES ('admin', '12345')

-- Livros
CREATE TABLE livros (
	livro_id  SERIAL PRIMARY KEY,
	isbn      VARCHAR (50) NOT NULL,
	nome	  VARCHAR (50) NOT NULL,
	autor_id  INTEGER,
		FOREIGN KEY (autor_id) REFERENCES autores(autor_id),
	editora   VARCHAR (50) NOT NULL,
	ano_publi CHAR(4),
	status    VARCHAR (20)
)

-- Autores
CREATE TABLE autores (
	autor_id    SERIAL PRIMARY KEY,
	nome 	    VARCHAR (50) NOT NULL,
	pais_origem VARCHAR (3) NOT NULL
)

-- Clientes
CREATE TABLE clientes (
	matricula 		 SERIAL PRIMARY KEY,
	nome      		 VARCHAR (50) NOT NULL,
	telefone  		 VARCHAR (20) NOT NULL,
	livros_retirados INTEGER
)

-- Retirada de Livros
CREATE TABLE retirada (
	id_retirada 	  SERIAL PRIMARY KEY,
	matricula_cliente INTEGER,
		FOREIGN KEY (matricula_cliente) REFERENCES clientes(matricula),
	livro_id 		  INTEGER,
		FOREIGN KEY (livro_id) REFERENCES livros(livro_id),
	data_retirada 	  CHAR(10)
)

-- Devolução de Livros
CREATE TABLE devolucao (
	id_devolucao   SERIAL PRIMARY KEY,
	livro_id INTEGER,
		FOREIGN KEY (livro_id) REFERENCES livros(livro_id),
	data_devolucao CHAR(10),
	id_retirada INTEGER,
		FOREIGN KEY (id_retirada) REFERENCES retirada(id_retirada),
	matricula   INTEGER,
		FOREIGN KEY (matricula) REFERENCES clientes(matricula)
)

alter table devolucao add column matricula integer

drop table usuarios
drop table clientes
drop table autores
drop table livros
drop table retirada
drop table devolucao

select * from usuarios
select * from livros order by livro_id
select * from autores
select * from clientes order by matricula
select * from retirada
select * from devolucao
