export interface IProfile {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string;
    phone_number: string;
    is_photographer: boolean;
    created_at: Date;
    updated_at: Date;
    photographer_profiles: IPhotographer;
}

export interface IPhotographer {
    id: string;
    bio: string;
    location: string;
    hourly_rate: number;
    services_offered: string;
    portfolio_url: string;
    created_at: Date;
    updated_at: Date;
    photographer_categories: IPhotographer_category[]
}

export interface IPhotographer_category {
    categories: {
        id: string,
        name: string,
        slug: string,
    }
}

export interface ICategory {
    id: string,
    name: string,
    slug: string,
}