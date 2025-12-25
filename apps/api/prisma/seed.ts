import { PrismaClient } from '../src/generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // 1. Create Business
    const business = await prisma.business.upsert({
        where: { slug: 'acme-corp' },
        update: {},
        create: {
            name: 'Acme Corp',
            slug: 'acme-corp',
            status: 'ACTIVE',
            currency: 'USD',
            brandColor: '#065106',
            address: '123 Business St, Enterprise City',
            taxId: 'TX-123456',
        },
    });

    console.log('Created Business:', business.name);

    // 2. Create Owner User
    const owner = await prisma.user.upsert({
        where: { email: 'owner@acme.com' },
        update: {},
        create: {
            email: 'owner@acme.com',
            password,
            role: 'OWNER',
            businessId: business.id,
        },
    });

    console.log('Created Owner:', owner.email);

    // 3. Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@acme.com' },
        update: {},
        create: {
            email: 'admin@acme.com',
            password,
            role: 'ADMIN',
            businessId: business.id,
        },
    });

    console.log('Created Admin:', admin.email);

    // 4. Create Client 1
    const clientUser1 = await prisma.user.upsert({
        where: { email: 'client1@gmail.com' },
        update: {},
        create: {
            email: 'client1@gmail.com',
            password,
            role: 'CLIENT',
            businessId: business.id,
        },
    });

    const client1 = await prisma.client.create({
        data: {
            name: 'John Doe',
            email: 'client1@gmail.com',
            phone: '+123456789',
            businessId: business.id,
            userId: clientUser1.id,
        },
    });

    console.log('Created Client 1:', client1.name);

    // 5. Create Project for Client 1
    const project1 = await prisma.project.create({
        data: {
            title: 'Website Redesign',
            description: 'The rebranding of the main corporate website.',
            status: 'IN_PROGRESS',
            businessId: business.id,
            clientId: client1.id,
        },
    });

    console.log('Created Project:', project1.title);

    // 6. Create Invoice for Client 1
    const invoice1 = await prisma.invoice.create({
        data: {
            invoiceNumber: 'INV-2023-001',
            amount: 1500.00,
            status: 'SENT',
            subtotal: 1500.00,
            tax: 0,
            total: 1500.00,
            businessId: business.id,
            clientId: client1.id,
            lineItems: [
                { description: 'Design Phase', quantity: 1, rate: 1000, tax: 0 },
                { description: 'Consulting', quantity: 5, rate: 100, tax: 0 }
            ],
        },
    });

    console.log('Created Invoice:', invoice1.invoiceNumber);

    // 7. Create Activity
    await prisma.activity.create({
        data: {
            type: 'PROJECT_CREATED',
            description: 'Project "Website Redesign" was created',
            userId: owner.id,
            projectId: project1.id,
            businessId: business.id,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
