-- CRIANDO TABELA
CREATE TABLE livros (
    livro_id  SERIAL PRIMARY KEY,
    isbn      VARCHAR(50) NOT NULL,
    nome      VARCHAR(50) NOT NULL,
    editora   VARCHAR (50) NOT NULL,
	ano_publi CHAR(4),
	status    VARCHAR (20)
)

-- INSERINDO DADOS
INSERT INTO livros  (isbn, nome, editora, ano_publi, status)
VALUES ('12345', 'Costura de Nuvens', 'Rocco', '2023', 'disponível');

INSERT INTO livros  (isbn, nome, editora, ano_publi, status)
VALUES ('67891', 'Imperfeitos', 'L&M Pocket', '2022', 'disponível');

INSERT INTO livros  (isbn, nome, editora, ano_publi, status)
VALUES ('23456', 'O Guarani', 'Seguinte', '2019', 'disponível');

INSERT INTO livros  (isbn, nome, editora, ano_publi, status)
VALUES ('78912', 'A Menina Que Roubava Livros', 'O Arqueiro', '2022', 'disponível');

-- BUSCANDO OS DADOS
select * from livros order by livro_id