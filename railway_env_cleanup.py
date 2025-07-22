#!/usr/bin/env python
"""
Railway environment cleanup script
Removes problematic environment variables that might cause PostgreSQL errors
"""
import os

def cleanup_environment():
    """Clean up problematic environment variables"""
    print("🧹 Cleaning up environment variables...")
    
    # List of problematic variables that might cause PostgreSQL errors
    problematic_vars = [
        'db_type', 'DB_TYPE', 'database_type', 'DATABASE_TYPE',
        'type', 'TYPE', 'db_engine_type', 'DB_ENGINE_TYPE'
    ]
    
    cleaned = []
    for var in problematic_vars:
        if var in os.environ:
            del os.environ[var]
            cleaned.append(var)
    
    if cleaned:
        print(f"✅ Cleaned up variables: {', '.join(cleaned)}")
    else:
        print("✅ No problematic variables found")
    
    # Show current database-related environment variables
    print("\n📊 Current database environment variables:")
    db_vars = ['DATABASE_URL', 'PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD']
    for var in db_vars:
        value = os.environ.get(var, 'NOT SET')
        if 'PASSWORD' in var:
            value = value[:10] + '...' if value != 'NOT SET' else 'NOT SET'
        print(f"  {var}: {value}")

if __name__ == "__main__":
    cleanup_environment()