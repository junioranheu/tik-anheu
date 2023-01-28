export interface iPexel {
    next_page: string;
    page: number;
    per_page: number;
    total_results: number;
    url: string;
    videos: iPexelVideo[];
}

export interface iPexelVideo {
    avg_color: any;
    duration: number;
    full_res: any;
    height: number;
    id: number;
    tags: [];
    url: string;
    user: {
        id: number;
        name: string;
        url: string;
    };
    video_files: {
        file_type: string;
        fps: number;
        height: number;
        id: number;
        link: string;
        quality: string;
        width: number;
    }[];
    video_pictures: {
        id: number;
        nr: number;
        picture: string;
    }[];
    width: number;
}