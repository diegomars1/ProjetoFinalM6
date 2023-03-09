-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Mar-2023 às 20:46
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `senabank`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `agencia`
--

CREATE TABLE `agencia` (
  `id_da_agencia` int(11) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `agencia`
--

INSERT INTO `agencia` (`id_da_agencia`, `endereco`, `email`, `telefone`) VALUES
(123, 'Rua Exemplo 34, Méier', 'meier123@gmail.com', '21030496037'),
(130, 'Rua Exemplo 24, Vila da Penha', 'vilapenha130@gmail.com', '21097306480'),
(159, 'Rua Exemplo 15, Centro', 'centro159@gmail.com', '21456731596'),
(206, 'Rua Exemplo 55, Madureira', 'madureira206@gmail.com', '21109406789'),
(357, 'Rua Exemplo 45, São Cristóvão', 'saocristovao357@gmail.com', '21301089137'),
(405, 'Rua Exemplo 94, Botafogo', 'botafogo405@gmail.com', '21090438304'),
(710, 'Rua Exemplo 12, Cachambi', 'cachambi710@gmail.com', '21750934098'),
(753, 'Rua Exemplo 91, Penha', 'penha753@gmail.com', '21450957036');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cartao`
--

CREATE TABLE `cartao` (
  `id_do_cartao` int(11) NOT NULL,
  `numero_do_cartao` bigint(20) NOT NULL,
  `coddeseg` int(3) NOT NULL,
  `dataexp` varchar(20) NOT NULL,
  `tipodecartao` varchar(20) NOT NULL,
  `limitecartao` int(100) NOT NULL,
  `saldocartao` int(100) NOT NULL,
  `nome_cliente` varchar(30) NOT NULL,
  `cpf` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cartao`
--

INSERT INTO `cartao` (`id_do_cartao`, `numero_do_cartao`, `coddeseg`, `dataexp`, `tipodecartao`, `limitecartao`, `saldocartao`, `nome_cliente`, `cpf`) VALUES
(1, 1463497246045, 201, '05/2030', 'Crédito', 4500, 2500, 'Felipe Barreiro Nascimento', 15731864580),
(2, 1067954036401, 202, '07/2030', 'Crédito', 5000, 3000, 'Maria Eduarda Pereira', 16049703485),
(3, 6493046821750, 203, '02/2030', 'Débito', 3500, 1200, 'Kaylane Mattos Silva', 13064089045),
(4, 4350169874216, 204, '01/2030', 'Débito', 6000, 3200, 'Breno Ricardo Andrade', 10973460587),
(5, 4561970649015, 205, '03/2030', 'Crédito', 6000, 4500, 'Luis Guilherme Pacheco', 15346706794),
(6, 1576341067950, 208, '08/2030', 'Débito', 7800, 5600, 'Yuri Leonor Lopes', 43096374920),
(7, 5304609705642, 206, '04/2030', 'Crédito', 4500, 1200, 'Lucas da Silva Souza', 45630972462),
(8, 4608901739504, 207, '06/2030', 'Débito', 6200, 4000, 'José Antônio Nascimento', 45018097661);

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_do_cliente` int(11) NOT NULL,
  `nome_cliente` varchar(30) NOT NULL,
  `cpf` bigint(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefone` bigint(20) NOT NULL,
  `endereco_cliente` varchar(30) NOT NULL,
  `id_do_emprestimo` int(11) NOT NULL,
  `numero_do_cartao` bigint(20) NOT NULL,
  `id_da_agencia` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id_do_cliente`, `nome_cliente`, `cpf`, `email`, `telefone`, `endereco_cliente`, `id_do_emprestimo`, `numero_do_cartao`, `id_da_agencia`) VALUES
(1, 'Felipe Barreiro Nascimento', 15731864580, 'lipebar@gmail.com', 21945196286, 'Rua Exemplo 23, Madureira', 215, 1463497246045, 206),
(2, 'Maria Eduarda Pereira', 16049703485, 'eduarda38@gmail.com', 21035796014, 'Rua Exemplo 81, Guadalupe', 216, 1067954036401, 159),
(3, 'Kaylane Mattos Silva', 13064089045, 'kay54@gmail.com', 21648967501, 'Rua Exemplo 18, Anchieta', 217, 6493046821750, 130),
(4, 'Breno Ricardo Andrade', 10973460587, 'breno23@gmail.com', 21579043067, 'Rua Exemplo 99, Taquara', 218, 4350169874216, 123),
(5, 'Luis Guilherme Pacheco', 15346706794, 'guipacheco@gmail.com', 21430496705, 'Rua Exemplo 22, Penha', 219, 4561970649015, 357),
(6, 'Yuri Leonor Lopes', 43096374920, 'leonor32@gmail.com', 21056740934, 'Rua Exempo 66, Ipanema', 222, 1576341067950, 753),
(7, 'Lucas da Silva Souza', 45630972462, 'lucas34@gmail.com', 21649735604, 'Rua Exemplo 10, Botafogo', 220, 5304609705642, 405),
(8, 'José Antônio Nascimento', 45018097661, 'jose20@gmail.com', 21029436780, 'Rua Exemplo 32, Recreio', 221, 4608901739504, 710);

-- --------------------------------------------------------

--
-- Estrutura da tabela `contas`
--

CREATE TABLE `contas` (
  `id_da_conta` int(11) NOT NULL,
  `nome_cliente` varchar(30) NOT NULL,
  `cpf` bigint(11) NOT NULL,
  `tipo_de_conta` varchar(20) NOT NULL,
  `saldo` int(11) NOT NULL,
  `id_da_agencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `contas`
--

INSERT INTO `contas` (`id_da_conta`, `nome_cliente`, `cpf`, `tipo_de_conta`, `saldo`, `id_da_agencia`) VALUES
(1, 'Felipe Barreiro Nascimento', 15731864580, 'Corrente', 3000, 206),
(2, 'Maria Eduarda Pereira', 16049703485, 'Poupança', 5000, 159),
(3, 'Kaylane Mattos Silva', 13064089045, 'Corrente', 3500, 130),
(4, 'Breno Ricardo Andrade', 10973460587, 'Poupança', 6000, 123),
(5, 'Luis Guilherme Pacheco', 15346706794, 'Corrente', 7500, 357),
(6, 'Yuri Leonor Lopes', 43096374920, 'Corrente', 3200, 753),
(7, 'Lucas da Silva Souza', 45630972462, 'Corrente', 3600, 405),
(8, 'José Antônio Nascimento', 45018097661, 'Poupança', 8500, 710);

-- --------------------------------------------------------

--
-- Estrutura da tabela `emprestimo`
--

CREATE TABLE `emprestimo` (
  `id_do_emprestimo` int(11) NOT NULL,
  `cpf` bigint(20) NOT NULL,
  `valor_emprestimo` bigint(20) NOT NULL,
  `parcelas` int(11) NOT NULL,
  `juros` varchar(20) NOT NULL,
  `data` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `emprestimo`
--

INSERT INTO `emprestimo` (`id_do_emprestimo`, `cpf`, `valor_emprestimo`, `parcelas`, `juros`, `data`) VALUES
(215, 15731864580, 4500, 5, '3%', '07/03/2023'),
(216, 16049703485, 1600, 3, '2%', '05/01/2023'),
(217, 13064089045, 3100, 7, '4%', '15/02/2023'),
(218, 10973460587, 1200, 3, '2%', '02/03/2023'),
(219, 15346706794, 3500, 5, '4%', '15/12/2022'),
(220, 45630972462, 4300, 7, '5%', '25/12/2022'),
(221, 45018097661, 6000, 10, '7%', '18/01/2023'),
(222, 43096374920, 4500, 12, '8%', '31/01/2023');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `id_funcionario` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cargo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `funcionarios`
--

INSERT INTO `funcionarios` (`id_funcionario`, `nome`, `cpf`, `email`, `telefone`, `cargo`) VALUES
(1, 'Roberto Alves Silva', '43019701646', 'robertoalves54@gmail.com', '21450460197', 'Auxiliar Administrativo'),
(2, 'Gabriel Santos Silva', '40160579315', 'gabi34@gmail.com', '21034685072', 'Auxiliar Administrativo'),
(3, 'Heitor Aguiar Santos', '45609073168', 'heitor90@gmail.com', '21345790164', 'Auxiliar Administrativo'),
(4, 'Rafael Araújo de Souza', '10679245831', 'rafa59@gmail.com', '21064957309', 'Auxiliar Administrativo'),
(5, 'Felipe Batista Carvalho', '46387689216', 'felipebatista43@gmail.com', '21963480679', 'Operador de Telemarketing'),
(6, 'Guilherme Ramalho Dias', '16793050496', 'guiramal@gmail.com', '21930460876', 'Operador de Telemarketing'),
(7, 'Davi Miguel Fagundes', '46305628750', 'davi56@gmail.com', '21647068306', 'Operador de Telemarketing'),
(8, 'Paulo Henrique Lins', '15634978064', 'henrique91@gmail.com', '21456809318', 'Gerente');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `agencia`
--
ALTER TABLE `agencia`
  ADD PRIMARY KEY (`id_da_agencia`);

--
-- Índices para tabela `cartao`
--
ALTER TABLE `cartao`
  ADD PRIMARY KEY (`id_do_cartao`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_do_cliente`);

--
-- Índices para tabela `contas`
--
ALTER TABLE `contas`
  ADD PRIMARY KEY (`id_da_conta`);

--
-- Índices para tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD PRIMARY KEY (`id_do_emprestimo`);

--
-- Índices para tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`id_funcionario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agencia`
--
ALTER TABLE `agencia`
  MODIFY `id_da_agencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2053;

--
-- AUTO_INCREMENT de tabela `cartao`
--
ALTER TABLE `cartao`
  MODIFY `id_do_cartao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_do_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `contas`
--
ALTER TABLE `contas`
  MODIFY `id_da_conta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  MODIFY `id_do_emprestimo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `id_funcionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
