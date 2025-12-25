const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seeding...');

    // 1. Existing Business "calm-business"
    const existingBusiness = await prisma.business.findFirst({
        where: { slug: 'calm-business' }
    });

    if (existingBusiness) {
        const bizId = existingBusiness.id;
        console.log(`Feeding data to existing business: ${existingBusiness.name} (${bizId})`);

        // Add clients
        const clientsData = [
            { name: 'Sarah Miller', email: 'sarah@design.com', phone: '+1 555-010-9988' },
            { name: 'Mark Thompson', email: 'mark@techcorp.io', phone: '+1 555-010-7766' }
        ];

        for (const c of clientsData) {
            const client = await prisma.client.upsert({
                where: { email: c.email },
                update: {},
                create: { ...c, businessId: bizId }
            });

            // Add projects for this client
            if (c.email === 'sarah@design.com') {
                await prisma.project.create({
                    data: {
                        title: 'Brand Identity Refresh',
                        description: 'New logo, color palette, and brand guidelines for 2026.',
                        status: 'IN_PROGRESS',
                        businessId: bizId,
                        clientId: client.id
                    }
                });
                await prisma.project.create({
                    data: {
                        title: 'Mobile App Wireframes',
                        description: 'Customer loyalty app design.',
                        status: 'DELIVERED',
                        businessId: bizId,
                        clientId: client.id
                    }
                });

                // Add Invoice for Sarah
                await prisma.invoice.create({
                    data: {
                        invoiceNumber: `INV-${Math.random().toString(36).substring(7).toUpperCase()}`,
                        amount: 2500,
                        subtotal: 2500,
                        tax: 0,
                        total: 2500,
                        status: 'PAID',
                        businessId: bizId,
                        clientId: client.id,
                        lineItems: [
                            { description: 'Initial Setup Fee', quantity: 1, rate: 1000, tax: 0 },
                            { description: 'Design Discovery Phase', quantity: 1, rate: 1500, tax: 0 }
                        ]
                    }
                });
            } else {
                await prisma.project.create({
                    data: {
                        title: 'E-commerce Platform Migration',
                        description: 'Migrating store to headless commerce.',
                        status: 'PENDING',
                        businessId: bizId,
                        clientId: client.id
                    }
                });
            }
        }
    }

    // 2. New Business "Apex Creative"
    const apexSlug = 'apex-creative';
    const existingApex = await prisma.business.findUnique({ where: { slug: apexSlug } });

    if (!existingApex) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const apexBiz = await prisma.business.create({
            data: {
                name: 'Apex Creative',
                slug: apexSlug,
                brandColor: '#e11d48',
                currency: 'EUR',
                address: '123 Pixel Ave, Berlin, Germany',
            }
        });

        await prisma.user.create({
            data: {
                email: 'admin@apex.com',
                password: hashedPassword,
                role: 'OWNER',
                businessId: apexBiz.id
            }
        });

        const bmwClient = await prisma.client.create({
            data: {
                name: 'BMW',
                email: 'contact@bmw.de',
                businessId: apexBiz.id
            }
        });

        await prisma.project.create({
            data: {
                title: 'Summer Campaign Assets',
                description: 'Social media banners and video ads.',
                status: 'IN_PROGRESS',
                businessId: apexBiz.id,
                clientId: bmwClient.id
            }
        });

        console.log('Created new sample business: Apex Creative');
    }

    console.log('Seeding finished successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
