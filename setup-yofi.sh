#!/bin/bash

echo "🚀 Setting up YoFi TV MVP..."

# Create directories
mkdir -p lib components
mkdir -p app/api/auth/callback
mkdir -p app/api/stations
mkdir -p "app/api/rotation/[stationId]"
mkdir -p "app/api/chat/[stationId]"
mkdir -p app/api/tips
mkdir -p "app/stations/[stationId]"
mkdir -p app/dashboard

echo "✅ Directories created"
