export interface DNSRecords {
    A?: string[];
    AAAA?: string[];
    CNAME?: string;
    URL?: string;
    MX?: string[];
    TXT?: string[];
    [key: string]: string | string[] | undefined;
}

export function validateDomain(domain: string) {
    if (!domain) {
        throw new Error('Domain name is required');
    }

    if (domain !== domain.toLowerCase()) {
        throw new Error('Domain name must be lowercase');
    }

    if (domain.includes(' ')) {
        throw new Error('Domain name cannot contain spaces');
    }

    if (domain.includes('..')) {
        throw new Error('Domain name cannot contain consecutive dots');
    }
    
    if (domain.length < 1) {
        throw new Error('Domain name must be at least 1 character long');
    }
    
    if (domain.startsWith('.')) {
        throw new Error('Domain name cannot start with a dot');
    }

    if (domain.endsWith('.')) {
        throw new Error('Domain name cannot end with a dot');
    }

    if (!/^[a-z0-9-.]+$/.test(domain)) {
        throw new Error('Domain name can only contain letters, numbers, and hyphens');
    }
}

export function validateRecords(records: DNSRecords) {
    const recordsLength = Object.keys(records).length;

    if (recordsLength === 0) {
        throw new Error('Atleast one record is required');
    }

    if ('CNAME' in records && recordsLength > 1) {
        throw new Error('CNAME record cannot be combined with other record types');
    }

    if ('URL' in records && ('A' in records || 'AAAA' in records)) {
        throw new Error('URL record cannot be combined with A or AAAA record types');
    }
}