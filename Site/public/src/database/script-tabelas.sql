CREATE DATABASE Owlfall;

USE Owlfall;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    imagem VARCHAR(255),
    dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ficha (
    idFicha INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    nomePersonagem VARCHAR(80) NOT NULL,
    jogador VARCHAR(80),
    classe VARCHAR(50),
    nivel INT DEFAULT 1,
    anotacoes TEXT,
    aparencia TEXT,
    personalidade TEXT,
    historia TEXT,
    objetivo TEXT,
    imagem VARCHAR(255),
    criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE statusFicha (
    idStatus INT PRIMARY KEY AUTO_INCREMENT,
    fkFicha INT NOT NULL,
    vidaAtual INT DEFAULT 0,
    vidaMax INT DEFAULT 0,
    sanidadeAtual INT DEFAULT 0,
    sanidadeMax INT DEFAULT 0,
    nenAtual INT DEFAULT 0,
    nenMax INT DEFAULT 0,
    FOREIGN KEY (fkFicha) REFERENCES ficha(idFicha)
);

CREATE TABLE atributo (
    idAtributo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE fichaAtributo (
    fkFicha INT NOT NULL,
    fkAtributo INT NOT NULL,
    valor INT DEFAULT 0,
    PRIMARY KEY (fkFicha, fkAtributo),
    FOREIGN KEY (fkFicha) REFERENCES ficha(idFicha),
    FOREIGN KEY (fkAtributo) REFERENCES atributo(idAtributo)
);

CREATE TABLE pericia (
    idPericia INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE fichaPericia (
    fkFicha INT NOT NULL,
    fkPericia INT NOT NULL,
    bonus INT DEFAULT 0,
    treino INT DEFAULT 0,
    outros INT DEFAULT 0,
    PRIMARY KEY (fkFicha, fkPericia),
    FOREIGN KEY (fkFicha) REFERENCES ficha(idFicha),
    FOREIGN KEY (fkPericia) REFERENCES pericia(idPericia)
);

CREATE TABLE habilidade (
    idHabilidade INT PRIMARY KEY AUTO_INCREMENT,
    fkFicha INT NOT NULL,
    nome VARCHAR(80) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    FOREIGN KEY (fkFicha) REFERENCES ficha(idFicha)
);

CREATE TABLE item (
    idItem INT PRIMARY KEY AUTO_INCREMENT,
    fkFicha INT NOT NULL,
    nome VARCHAR(80) NOT NULL,
    descricao TEXT,
    quantidade INT DEFAULT 1,
    imagem VARCHAR(255),
    FOREIGN KEY (fkFicha) REFERENCES ficha(idFicha)
);

CREATE TABLE campanha (
    idCampanha INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    descricao TEXT,
    fkMestre INT NOT NULL,
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkMestre) REFERENCES usuario(idUsuario)
);

CREATE TABLE fichaCampanha (
    fkFicha INT NOT NULL,
    fkCampanha INT NOT NULL,
    PRIMARY KEY (fkFicha, fkCampanha),
    FOREIGN KEY (fkFicha) REFERENCES ficha(idFicha),
    FOREIGN KEY (fkCampanha) REFERENCES campanha(idCampanha)
);

INSERT INTO atributo (nome) VALUES 
	('agilidade'),
	('força'),
	('intelecto'),
	('presença'),
	('vigor'),
	('fortificador'),
	('transmutador'),
	('emissor'),
	('conjurador'),
	('manipulador'),
	('especialista');
    
INSERT INTO pericia (nome) VALUES
	('adestramento'),
	('artes'),
	('atletismo/Acrobacia'),
	('ciências'),
	('diplomacia'),
	('enganação'),
	('fortitude'),
	('furtividade'),
	('iniciativa'),
	('intimidação'),
	('investigação'),
	('luta'),
	('medicina'),
	('percepção'),
	('pilotagem'),
	('pontaria'),
	('profissão'),
	('reflexos'),
	('sobrevivência'),
	('espírito');

CREATE VIEW vw_ficha AS
	SELECT 
		f.idFicha,
		f.nomePersonagem,
		f.jogador,
		f.classe,
		f.nivel,
		f.anotacoes,
		f.aparencia,
		f.personalidade,
		f.historia,
		f.objetivo,
		f.imagem,
		f.criado,
		u.nome AS nomeUsuario,
		u.email AS emailUsuario
	FROM ficha f
	JOIN usuario u ON f.fkUsuario = u.idUsuario;

CREATE VIEW vw_personagens AS
	SELECT 
        f.fkUsuario,
		f.idFicha,
		f.nomePersonagem,
		f.classe,
		f.nivel,
		f.criado,
        f.imagem
	FROM ficha f;

CREATE VIEW vw_status AS
	SELECT 
		s.vidaAtual,
		s.vidaMax,
		s.sanidadeAtual,
		s.sanidadeMax,
		s.nenAtual,
		s.nenMax
	FROM statusFicha s;

CREATE VIEW vw_atributos AS
	SELECT 
		a.nome AS atributo,
		fa.valor
	FROM fichaAtributo fa
	JOIN atributo a ON fa.fkAtributo = a.idAtributo;

CREATE VIEW vw_pericias AS
	SELECT 
		p.nome AS pericia,
		fp.bonus,
		fp.treino,
		fp.outros,
		(fp.bonus + fp.treino + fp.outros) AS total
	FROM fichaPericia fp
	JOIN pericia p ON fp.fkPericia = p.idPericia;
    
CREATE VIEW vw_habilidades AS 
	SELECT 
		nome,
		descricao
	FROM habilidade;

CREATE VIEW vw_itens AS
	SELECT 
		nome,
		descricao,
		quantidade
	FROM item;

CREATE VIEW vw_campanhas AS 
	SELECT 
		c.idCampanha,
		c.nome AS campanha,
		u.nome AS mestre
	FROM fichaCampanha fc
	JOIN campanha c ON fc.fkCampanha = c.idCampanha
	JOIN usuario u ON c.fkMestre = u.idUsuario;

CREATE VIEW vw_geral AS 
	SELECT 
		f.*,
		u.nome AS nomeUsuario,
		u.email AS emailUsuario
	FROM ficha f
	JOIN usuario u ON f.fkUsuario = u.idUsuario;