import { Product } from "@/config/types"

export const PRODUCTS_LIST: Product[] = [
    {
        "id": "1",
        "name": "Shirt",
        "imageUrl": "https://www.collinsdictionary.com/images/thumb/shirt_378037390_250.jpg?version=6.0.20",
        "originalPrice": 49,
        "discountPrice": 39,
        "offerPercentage": 20,
        "rating": 4.5,
        "ratingCount": 1234,
        "tags": ["Formal", "Cotton", "Slim Fit"],
        "department": null,
        isActive: true
    },
    {
        "id": "2",
        "name": "Pant",
        "imageUrl": "https://media.istockphoto.com/id/510615049/photo/mens-trousers.jpg?s=612x612&w=0&k=20&c=gdVhFuzt-Kbk4NG8cjaL1afjKoz_Z5Wddv2ssHFg2bM=",
        "originalPrice": 59,
        "discountPrice": 49,
        "offerPercentage": 17,
        "rating": 4.7,
        "ratingCount": 987,
        "tags": ["Casual", "Chinos", "Regular Fit"],
        "department": null,
        isActive: true
    },
    {
        "id": "3",
        "name": "Trousers",
        "imageUrl": "https://media.istockphoto.com/id/1281304280/photo/folded-blue-jeans-on-a-white-background-modern-casual-clothing-flat-lay-copy-space.jpg?s=1024x1024&w=is&k=20&c=8JDC-rbycmQNe1ET8SQJUOkUjICNGEgkSBDLbzUQ2lU=",
        "originalPrice": 39,
        "discountPrice": 19,
        "offerPercentage": 34,
        "rating": 4.8,
        "ratingCount": 567,
        "tags": ["Business", "Polyester", "Straight Leg"],
        "department": null,
        isActive: true
    },
    {
        "id": "4",
        "name": "Sweat Shirt",
        "imageUrl": "https://media.istockphoto.com/id/1134011741/photo/mens-grey-blank-sweatshirt-template-from-two-sides-natural-shape-on-invisible-mannequin-for.jpg?s=1024x1024&w=is&k=20&c=sFI0UgycXH-eBprkD6sCHzY9P1yo-DdTuIxoLa6UyL4=",
        "originalPrice": 29,
        "discountPrice": 19,
        "offerPercentage": 14,
        "rating": 4.8,
        "ratingCount": 567,
        "tags": ["Business", "Polyester", "Straight Leg"],
        "department": null,
        isActive: true
    },
    {
        "id": "5",
        "name": "Saree",
        "imageUrl": "https://media.istockphoto.com/id/93355119/photo/indian-saris.jpg?s=1024x1024&w=is&k=20&c=Twq9xmZru2DeyqjD8M-aVDeMt81GqiYGzTmAMUSdhLs=",
        "originalPrice": 69,
        "discountPrice": 59,
        "offerPercentage": 14,
        "rating": 4.8,
        "ratingCount": 567,
        "tags": ["Business", "Polyester", "Straight Leg"],
        "department": null,
        isActive: true
    }
]
export const DEPARTMENT_LIST = [
    { "id": "1", isActive: true, name: "women", url: "https://img.freepik.com/free-photo/abstract-multi-colored-wave-pattern-shiny-flowing-modern-generated-by-ai_188544-15588.jpg?t=st=1720866839~exp=1720870439~hmac=e5ff91209e28ac721d7c8528301ec986da819f64f73dea4810974228cccb3d96&w=1060" },
    { "id": "2", isActive: true, name: "men", url: "https://img.freepik.com/free-photo/abstract-multi-colored-wave-pattern-shiny-flowing-modern-generated-by-ai_188544-15588.jpg?t=st=1720866839~exp=1720870439~hmac=e5ff91209e28ac721d7c8528301ec986da819f64f73dea4810974228cccb3d96&w=1060" }
]
