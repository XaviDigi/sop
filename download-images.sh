#!/bin/bash

# Create directories
mkdir -p public/images/hero
mkdir -p public/images/features
mkdir -p public/images/testimonials

# Download hero image
curl -o public/images/hero/hero-image.jpg https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1200&auto=format&fit=crop

# Download feature images
curl -o public/images/features/feature-1.jpg https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop
curl -o public/images/features/feature-2.jpg https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop
curl -o public/images/features/feature-3.jpg https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop
curl -o public/images/features/feature-4.jpg https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=600&auto=format&fit=crop
curl -o public/images/features/feature-5.jpg https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop
curl -o public/images/features/feature-6.jpg https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop

# Download testimonial profile images
curl -o public/images/testimonials/person-1.jpg https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop
curl -o public/images/testimonials/person-2.jpg https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop
curl -o public/images/testimonials/person-3.jpg https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&auto=format&fit=crop
curl -o public/images/testimonials/person-4.jpg https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop

echo "All images downloaded successfully!"
