# Guia do Agente n8n

## Ferramenta utilizada
**n8n-as-code** (`npx n8nac`) — CLI para gerenciar workflows como código TypeScript.

## Regras obrigatórias
- **NUNCA** usar curl ou chamadas HTTP diretas à API do n8n
- **NUNCA** criar arquivos `.json` para workflows — apenas `.workflow.ts`
- **SEMPRE** criar arquivos `.workflow.ts` com decorators TypeScript
- **SEMPRE** salvar na pasta: `workflows/n8n3_projeto_aws_com_br_doan_p/personal/`
- **SEMPRE** fazer push com `npx n8nac push`
- **SEMPRE** usar UUIDs v4 reais e únicos para os `id` de cada nó (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

---

## Estrutura do arquivo `.workflow.ts`

```typescript
import { workflow, node, links } from '@n8n-as-code/transformer';

@workflow({
    name: 'Nome do Workflow',
    active: false,
    settings: { executionOrder: 'v1' },
})
export class NomeDoWorkflowWorkflow {

    @node({
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',  // UUID v4 real e único
        name: 'Manual Trigger',
        type: 'n8n-nodes-base.manualTrigger',
        version: 1,
        position: [250, 300],
    })
    ManualTrigger = {};

    @node({
        id: 'a3bb189e-8bf9-3888-9912-ace4e6543002',  // UUID v4 real e único
        name: 'Code',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [450, 300],
    })
    Code = {
        jsCode: "return [{ json: { resultado: 'valor' } }];",
    };

    @links()
    defineRouting() {
        this.ManualTrigger.out(0).to(this.Code.in(0));
    }
}
```

---

## Comandos

```bash
# Enviar workflow para o n8n
npx n8nac push "workflows/n8n3_projeto_aws_com_br_doan_p/personal/Nome Do Workflow.workflow.ts"

# Baixar workflow existente do n8n (para usar como referência de estrutura)
npx n8nac pull <workflowId>

# Listar workflows
npx n8nac list
```

---

## Tipos de nós comuns

| Nome            | type                            | version | params principais         |
|-----------------|---------------------------------|---------|---------------------------|
| Manual Trigger  | n8n-nodes-base.manualTrigger    | 1       | `{}`                      |
| Code            | n8n-nodes-base.code             | 2       | `{ jsCode: '...' }`       |
| HTTP Request    | n8n-nodes-base.httpRequest      | 4       | `{ url, method, ... }`    |
| Webhook         | n8n-nodes-base.webhook          | 2       | `{ path, method }`        |
| Set             | n8n-nodes-base.set              | 3       | `{ assignments: [...] }`  |
| IF              | n8n-nodes-base.if               | 2       | `{ conditions: {...} }`   |

---

## Instância configurada

- **Host:** https://n8n3.projeto-aws.com.br
- **Projeto:** Personal
- **Config:** `n8nac-config.json` (já autenticado — não modificar)
- **State:** `workflows/n8n3_projeto_aws_com_br_doan_p/personal/.n8n-state.json`

---

## Segurança

- `n8nac-config.json` e `.kiro/settings/mcp.json` contêm credenciais — **não versionar no git**
- Se o projeto for versionado, adicionar ao `.gitignore`:
  ```
  n8nac-config.json
  .kiro/settings/mcp.json
  ```
