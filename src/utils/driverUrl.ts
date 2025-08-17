
export default function formatGoogleDriveUrl(url:string) {
    const fileId = url.match(/\/(?:file\/d\/|uc\?id=|\/d\/)([a-zA-Z0-9_-]+)/)?.[1];
    return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : '';
}