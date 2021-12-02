# Cadastro de carro

**Requisitos Funcionais**
- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**Regras de Negócios**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado por padrâo, como disponível para locação.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carros

**Requisitos Funcionais**
- Deve ser possível listar todos carros os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de Negócios**
- O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no carro

**Requisitos Funcionais**
- Deve ser possível cadastrar uma especificação para um carro.

**Regras de Negócios**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagens do carrro

**Requisitos Funcionais**
- Deve ser possível cadastrar a imagem do carro.

**RNF**
- Utilizar o multer para upload dos arquivos.

**Regras de Negócios**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro

**Requisitos Funcionais**
- Deve ser possível cadastrar um aluguel.

**Regras de Negócios**
- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possível cadastrar um novo aluguél caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguél caso já exista um aberto para o mesmo carro.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível


# Devolução do carro

**Requisitos Funcionais**
- Deve ser possível realizar a devolução de um carro


**Regras de Negócios**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrada a dirária completa.
- Ao realizar a devolução, o usuári odeverá ser liberado para realizar um novo aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário da devolução seja superior ao horário previsto da entrega, deverá ser cobrada uma multa proporcional aos dias de atraso.
- caso haja multa, devertá ser somado o valor ao valor total do aluguél
- O usuário deve estar logado na aplicação.


# Listagem de Alugueis para usuário

**Requisitos Funcionais**
- Deve ser possível realizar a busca de todos os alugueis para o usuário


**Regras de Negócios**
- O usuário deve estar logado na aplicação


# Recuperar Senha

**Requisitos Funcionais**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um email com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**Regras de Negócios**
- O usuário precisa informar uma nova senha
- o link enviado para a recuperação de senha deve expirar em 3 horas
