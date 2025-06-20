{
  "openapi": "3.1.0",
  "info": {
    "title": "Shia Library API",
    "version": "1.0.0",
    "description": "API to search in the Shia digital library."
  },
  "paths": {
    "/api/search": {
      "post": {
        "operationId": "searchInLibrary",
        "summary": "Search in the Shia library",
        "description": "Allows querying the Shia library by keyword and category.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "query": { "type": "string" },
                  "category": { "type": "string" }
                },
                "required": ["query"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Search results",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "results": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": { "type": "string" },
                          "url": { "type": "string" },
                          "author": { "type": "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
