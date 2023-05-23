export interface Calculator { 
    url: string;
    method: string;
    queryParams: string;
    output: string
}

export interface Calculate {
    serverLocation: string;
    appLocation: string;
    request: [Calculator]
}
