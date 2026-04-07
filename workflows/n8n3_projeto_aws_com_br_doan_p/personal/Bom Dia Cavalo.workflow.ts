import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : Bom Dia Cavalo
// Nodes   : 2  |  Connections: 1
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// ManualTrigger                      manualTrigger
// Code                               code
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// ManualTrigger
//    → Code
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'XEhzJwUGm4byLSGO',
    name: 'Bom Dia Cavalo',
    active: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class BomDiaCavaloWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: 'a1b2c3d4-0001-0001-0001-000000000001',
        name: 'Manual Trigger',
        type: 'n8n-nodes-base.manualTrigger',
        version: 1,
        position: [250, 300],
    })
    ManualTrigger = {};

    @node({
        id: 'a1b2c3d4-0002-0002-0002-000000000002',
        name: 'Code',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [450, 300],
    })
    Code = {
        jsCode: "return [{ json: { mensagem: 'Bom dia, cavalo!' } }];",
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.ManualTrigger.out(0).to(this.Code.in(0));
    }
}
