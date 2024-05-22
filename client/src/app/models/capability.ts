class MinimumSoftwareLevel {
    component: string
    minimumVersion: string
    packageLink: string[]
}


export class Capability {
    name: string
    category: string
    state: string
    description: string
    tags: string[]
    beamCompoundSemanticVersion: string
    minimumSoftwareLevels: MinimumSoftwareLevel[]
    supportingDocuments: string[]
    deleted: boolean
}

export class CreatedCapability extends Capability {
    id: string
}
