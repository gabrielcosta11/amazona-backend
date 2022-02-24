import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Gabriel',
            email: 'admin@example.com',
            password: String(bcrypt.hashSync('1234', 8)),
            isAdmin: true,
        },
        {
            name: 'João',
            email: 'user@example.com',
            password: String(bcrypt.hashSync('1234', 8)),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Adidas Slim Shirt',
            category: 'Shirt',
            price: 120,
            countInStock: 0,
            image: 'https://raw.githubusercontent.com/gabrielcosta11/amazona-images/main/s-adidas.jpg',
            brand: 'Nike',
            description: 'Produto de alta qualidade'
        },
        {
            name: 'Nike Slim Shirt',
            category: 'Shirt',
            price: 150,
            countInStock: 10,
            image: 'https://raw.githubusercontent.com/gabrielcosta11/amazona-images/main/s-nike.jpg',
            brand: 'Nike',
            description: 'Produto de alta qualidade'
        },
        {
            name: 'Lacoste Slim Shirt',
            category: 'Shirt',
            price: 180,
            countInStock: 55,
            image: 'https://raw.githubusercontent.com/gabrielcosta11/amazona-images/main/s-lacoste.jpg',
            brand: 'Nike',
            description: 'Produto de alta qualidade'
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pant',
            price: 78,
            countInStock: 0,
            image: 'https://raw.githubusercontent.com/gabrielcosta11/amazona-images/main/p-nike.jpg',
            brand: 'Nike',
            description: 'Produto de alta qualidade'
        },
        {
            name: 'Puma Slim Pant',
            category: 'Pant',
            price: 65,
            countInStock: 22,
            image: 'https://raw.githubusercontent.com/gabrielcosta11/amazona-images/main/p-puma.jpg',
            brand: 'Nike',
            description: 'Produto de alta qualidade'
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Pant',
            price: 139,
            countInStock: 0,
            image: 'https://raw.githubusercontent.com/gabrielcosta11/amazona-images/main/p-adidas.jpg',
            brand: 'Nike',
            description: 'Produto de alta qualidade'
        }
    ]
}

export default data