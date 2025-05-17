import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await cleanDatabase();

    await prisma.cpu.createMany({
        data: [
            {
                id: 1,
                manufacturer: 'Intel',
                socket: 'LGA1700',
                name: 'Core i5-12400F',
                wattage: 65,
                frequency: 2.5,
                price: 18000,
            },
            {
                id: 2,
                manufacturer: 'Intel',
                socket: 'LGA1700',
                name: 'Core i7-12700K',
                wattage: 125,
                frequency: 3.6,
                price: 32000,
            },
            {
                id: 3,
                manufacturer: 'AMD',
                socket: 'AM5',
                name: 'Ryzen 5 7600X',
                wattage: 105,
                frequency: 4.7,
                price: 25000,
            },
            {
                id: 4,
                manufacturer: 'AMD',
                socket: 'AM4',
                name: 'Ryzen 7 5800X3D',
                wattage: 105,
                frequency: 3.4,
                price: 30000,
            },
            {
                id: 5,
                manufacturer: 'Intel',
                socket: 'LGA1200',
                name: 'Core i3-10100F',
                wattage: 65,
                frequency: 3.6,
                price: 8000,
            },
        ],
    });

    await prisma.gpu.createMany({
        data: [
            {
                id: 1,
                frequency: 1.77,
                manufacturer: 'NVIDIA',
                name: 'RTX 3060',
                port: 'PCIe 4.0',
                wattage: 170,
                price: 35000,
            },
            {
                id: 2,
                frequency: 1.86,
                manufacturer: 'NVIDIA',
                name: 'RTX 4060 Ti',
                port: 'PCIe 4.0',
                wattage: 160,
                price: 45000,
            },
            {
                id: 3,
                frequency: 2.31,
                manufacturer: 'AMD',
                name: 'RX 7600',
                port: 'PCIe 4.0',
                wattage: 165,
                price: 30000,
            },
            {
                id: 4,
                frequency: 2.25,
                manufacturer: 'NVIDIA',
                name: 'RTX 4070',
                port: 'PCIe 4.0',
                wattage: 200,
                price: 60000,
            },
            {
                id: 5,
                frequency: 2.1,
                manufacturer: 'AMD',
                name: 'RX 6700 XT',
                port: 'PCIe 4.0',
                wattage: 230,
                price: 40000,
            },
        ],
    });

    await prisma.motherboard.createMany({
        data: [
            {
                id: 1,
                manufacturer: 'ASUS',
                name: 'PRIME B660-PLUS',
                cpuManufacturer: 'Intel',
                socket: 'LGA1700',
                chipset: 'B660',
                port: 'PCIe 4.0',
                price: 12000,
            },
            {
                id: 2,
                manufacturer: 'Gigabyte',
                name: 'B650 AORUS ELITE',
                cpuManufacturer: 'AMD',
                socket: 'AM5',
                chipset: 'B650',
                port: 'PCIe 4.0',
                price: 18000,
            },
            {
                id: 3,
                manufacturer: 'MSI',
                name: 'MAG B550 TOMAHAWK',
                cpuManufacturer: 'AMD',
                socket: 'AM4',
                chipset: 'B550',
                port: 'PCIe 4.0',
                price: 15000,
            },
            {
                id: 4,
                manufacturer: 'ASRock',
                name: 'Z690 Phantom Gaming',
                cpuManufacturer: 'Intel',
                socket: 'LGA1700',
                chipset: 'Z690',
                port: 'PCIe 5.0',
                price: 22000,
            },
            {
                id: 5,
                manufacturer: 'ASUS',
                name: 'ROG STRIX H470-F',
                cpuManufacturer: 'Intel',
                socket: 'LGA1200',
                chipset: 'H470',
                port: 'PCIe 3.0',
                price: 10000,
            },
        ],
    });

    await prisma.psu.createMany({
        data: [
            {
                id: 1,
                manufacturer: 'Be Quiet!',
                name: 'Pure Power 11 600W',
                wattage: 600,
                price: 7000,
            },
            { id: 2, manufacturer: 'Corsair', name: 'RM750x', wattage: 750, price: 12000 },
            { id: 3, manufacturer: 'Seasonic', name: 'Focus GX-850', wattage: 850, price: 15000 },
            { id: 4, manufacturer: 'AeroCool', name: 'LUX 550W', wattage: 550, price: 5000 },
            {
                id: 5,
                manufacturer: 'Cooler Master',
                name: 'MWE Gold 650',
                wattage: 650,
                price: 8000,
            },
        ],
    });

    await prisma.ram.createMany({
        data: [
            {
                id: 1,
                manufacturer: 'Corsair',
                name: 'Vengeance LPX 32GB',
                capacity: 32,
                price: 9000,
            },
            { id: 2, manufacturer: 'Crucial', name: 'Ballistix 16GB', capacity: 16, price: 6000 },
            { id: 3, manufacturer: 'Patriot', name: 'Viper Steel 8GB', capacity: 8, price: 3000 },
        ],
    });

    console.log('Seed data created successfully!');
}

async function cleanDatabase() {
    await prisma.order.deleteMany();
    await prisma.configuration.deleteMany();
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    await prisma.cpu.deleteMany();
    await prisma.gpu.deleteMany();
    await prisma.motherboard.deleteMany();
    await prisma.psu.deleteMany();
    await prisma.ram.deleteMany();
}

main()
    .catch((e) => {
        console.error('Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
