# 🎮 Arcadium API

API do Arcadium: serviços completos para autenticação, perfis de usuário, jogos, reviews, rankings e interações sociais. Desenvolvida com foco em estabilidade, testes abrangentes e práticas de CI/CD.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Stack Tecnológica](#-stack-tecnológica)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Banco de Dados](#-banco-de-dados)
- [Documentação da API](#-documentação-da-api)
- [Estratégia de Testes](#-estratégia-de-testes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)
- [CI/CD](#-cicd)
- [Contribuindo](#-contribuindo)

## 🎯 Visão Geral

A **Arcadium API** é uma aplicação backend robusta que oferece:

- 🔐 **Autenticação e Autorização**: Sistema completo de login, registro e controle de acesso
- 👤 **Gestão de Perfis**: CRUD completo para perfis de usuário com customizações
- 🎮 **Catálogo de Jogos**: Gerenciamento de jogos, categorias e metadados
- ⭐ **Sistema de Reviews**: Avaliações e comentários sobre jogos
- 🏆 **Rankings**: Sistemas de pontuação e classificação
- 🤝 **Interações Sociais**: Funcionalidades de relacionamento entre usuários

## 🛠 Stack Tecnológica

- **Framework**: [NestJS](https://nestjs.com/) com TypeScript
- **ORM**: [Prisma](https://www.prisma.io/) para gerenciamento do banco de dados
- **Banco de Dados**: PostgreSQL (desenvolvimento via Docker)
- **Documentação**: Swagger/OpenAPI com [Scalar](https://scalar.com/)
- **Testes**: Jest para testes unitários e de integração
- **Validação**: Joi para validação de dados
- **Containerização**: Docker e Docker Compose

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker e Docker Compose
- Git

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd arcadium-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto usando o `.env.example` como modelo:

```env
SERVER_PORT=3333
NODE_ENV=development

# Banco de Dados
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@HOST:PORT/${DATABASE_NAME}?schema=public"
DATABASE_USER=""
DATABASE_PASSWORD=""
DATABASE_NAME=""
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações do Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Inicie a aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 🗃 Banco de Dados

### Configuração com Docker

O projeto inclui um `docker-compose.yml` que configura:
- PostgreSQL para desenvolvimento
- Volume persistente para os dados
- Configurações de rede adequadas

### Prisma ORM

#### Comandos úteis do Prisma:

```bash
# Gerar o cliente Prisma após mudanças no schema
npx prisma generate

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Resetar banco de dados (APENAS desenvolvimento)
npx prisma migrate reset

# Visualizar dados com Prisma Studio
npx prisma studio

# Fazer push do schema sem gerar migração (para prototipagem)
npx prisma db push
```

## 📚 Documentação da API

### Acessando a Documentação

A documentação interativa está disponível em:
- **Scalar UI**: `http://localhost:3000/docs` (interface moderna e responsiva)

### Documentando Controllers

Utilize os decorators do Swagger para documentar seus endpoints:

```typescript
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, UserResponseDto } from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: UserResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos'
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // implementação
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: UserResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado'
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    // implementação
  }
}
```

### Documentando DTOs

Documente suas classes DTO com decorators apropriados:

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email válido do usuário',
    example: 'joao@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'Avatar do usuário (URL)',
    example: 'https://example.com/avatar.jpg'
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'João Silva' })
  name: string;

  @ApiProperty({ example: 'joao@example.com' })
  email: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatar?: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  createdAt: Date;
}
```

### Boas Práticas para Documentação

1. **Use tags consistentes** para agrupar endpoints relacionados
2. **Documente todos os status codes possíveis**
3. **Inclua exemplos realistas** nos DTOs
4. **Use descrições claras e objetivas**
5. **Documente autenticação necessária** com `@ApiBearerAuth()`
6. **Mantenha a documentação atualizada** com o código

## 🧪 Estratégia de Testes

### Estrutura de Testes

Os testes devem ser organizados de forma clara, separando testes unitários (para services) e testes de integração (para controllers).

### Testes Unitários (Services)

**Cada service deve ter testes unitários completos:**

```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedUser = {
        id: '1',
        ...createUserDto,
        createdAt: new Date(),
      };

      jest.spyOn(prisma.user, 'create').mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(expectedUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
    });

    it('should throw error when email already exists', async () => {
      // Teste de caso de erro
    });
  });
});
```

### Testes de Integração (Controllers)

**Cada controller deve ter testes de integração:**

```typescript
// users.controller.spec.ts
describe('UsersController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  beforeEach(async () => {
    // Limpar banco de teste
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users', () => {
    it('should create user successfully', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(createUserDto.name);
          expect(res.body.email).toBe(createUserDto.email);
          expect(res.body).not.toHaveProperty('password');
        });
    });

    it('should return 400 for invalid data', async () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'invalid-email' })
        .expect(400);
    });
  });
});
```

### Comandos de Teste

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Testes com coverage
npm run test:cov

# Testes e2e
npm run test:e2e

# Executar testes específicos
npm test -- --testPathPattern=users
```

### Cobertura de Código

- **Meta**: Mínimo de 80% de cobertura
- **Services**: 90%+ de cobertura
- **Controllers**: 85%+ de cobertura
- **Utilitários**: 95%+ de cobertura

## 📁 Estrutura do Projeto

A estrutura do projeto ainda está sendo definida. O projeto seguirá os padrões do NestJS com organização modular por funcionalidade (auth, users, games, reviews, rankings, etc.).

## 📏 Padrões de Desenvolvimento

### Convenções de Nomenclatura

- **Arquivos**: kebab-case (`user-profile.service.ts`)
- **Classes**: PascalCase (`UserProfileService`)
- **Métodos/Variáveis**: camelCase (`findUserById`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

### Estrutura de Módulos

Cada módulo seguirá os padrões do NestJS, contendo controllers, services, DTOs e entities organizados de forma clara e consistente.

### Padrões de Código

1. **Services**: Contenham apenas lógica de negócio
2. **Controllers**: Responsáveis apenas por roteamento e validação
3. **DTOs**: Sempre validados com decorators
4. **Error Handling**: Use exception filters personalizados
5. **Logging**: Implemente logging estruturado
6. **Validation**: Use pipes de validação em todos os endpoints

### Exemplo de Service

```typescript
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      this.logger.log(`Creating user with email: ${createUserDto.email}`);

      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await this.hashPassword(createUserDto.password),
        },
      });

      this.logger.log(`User created successfully: ${user.id}`);
      return this.transformToResponseDto(user);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to create user');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    // implementação
  }

  private transformToResponseDto(user: any): UserResponseDto {
    // implementação
  }
}
```

## 🔄 CI/CD

### Pipeline de Deploy

O projeto está configurado para:

1. **Testes Automatizados**: Executados em cada PR/push
2. **Análise de Código**: ESLint e Prettier
3. **Cobertura de Código**: Verificação de metas de cobertura
4. **Build**: Compilação TypeScript
5. **Deploy**: Automatizado para ambientes de staging/produção

### Ambientes

- **Development**: Ambiente local com hot-reload
- **Staging**: Ambiente de testes integrados
- **Production**: Ambiente de produção

### Variáveis de Ambiente por Ambiente

```bash
# Development
NODE_ENV=development
DATABASE_URL=postgresql://...

# Staging
NODE_ENV=staging
DATABASE_URL=postgresql://...

# Production
NODE_ENV=production
DATABASE_URL=postgresql://...
```

## 🤝 Contribuindo

### Fluxo de Desenvolvimento

1. **Fork** o repositório
2. **Crie uma branch** para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Implemente** a funcionalidade com testes
4. **Execute os testes** (`npm test`)
5. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
6. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
7. **Abra um Pull Request**

### Padrão de Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona endpoint para busca de usuários
fix: corrige validação de email
docs: atualiza documentação da API
test: adiciona testes para UserService
refactor: melhora estrutura do AuthModule
```

### Checklist para Pull Request

- [ ] Código segue os padrões estabelecidos
- [ ] Testes unitários implementados
- [ ] Testes de integração implementados
- [ ] Documentação Swagger atualizada
- [ ] Cobertura de código adequada
- [ ] Sem warnings de linting
- [ ] README atualizado se necessário

---

## 📞 Suporte

Para dúvidas e suporte:
- Crie uma [issue](link-para-issues) no repositório
- Consulte a [documentação da API](http://localhost:3000/docs)
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ pela equipe Arcadium**
