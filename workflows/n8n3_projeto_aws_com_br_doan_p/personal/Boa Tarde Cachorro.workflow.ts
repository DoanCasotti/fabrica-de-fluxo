import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : Boa Tarde Cachorro
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
    id: 'ezFESIOHc263M23B',
    name: 'Boa Tarde Cachorro',
    active: false,
    settings: { executionOrder: 'v1', callerPolicy: 'workflowsFromSameOwner', availableInMCP: false },
})
export class BoaTardeCachorroWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: 'fcb29107-3cc3-40c8-a7f1-a5d83e55923d',
        name: 'Manual Trigger',
        type: 'n8n-nodes-base.manualTrigger',
        version: 1,
        position: [250, 300],
    })
    ManualTrigger = {};

    @node({
        id: '73714ebb-ed6d-4188-9a9a-c6bf322185da',
        name: 'Code',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [450, 300],
    })
    Code = {
        jsCode: "return [{ json: { mensagem: 'Boa tarde, cachorro!' } }];",
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.ManualTrigger.out(0).to(this.Code.in(0));
    }
}
