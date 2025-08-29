// Inject inline banners after each N ads
export default function injectBanners(list, banners, frequency) {
    if (!Array.isArray(list) || !Array.isArray(banners) || frequency <= 0) return list;
    const result = [];
    let idx = 0, bannerIdx = 0;
    for (const item of list) {
        result.push(item);
        idx++;
        if (idx % frequency === 0 && banners.length) {
            result.push({ __banner: true, banner: banners[bannerIdx % banners.length] });
            bannerIdx++;
        }
    }
    return result;
}