## API Notificaciones - Autenticación

URL stage: https://notifications-api-stage.widergydev.com/api/v1

URL prod : https://notifications-api.widergy.com/api/v1

---

#### Obtener un Token de Utility:

**POST** /authenticateUtility

- Headers:

```json
{
  "ApiKey": "String",
  "ApiSecret": "String"
}
```

- No requiere Body.

- Responses:

  - Status 200:
    - ```json
      {
        "message": "Hi {{ utility.name }}, enjoy your token!",
        "expiration": "Number", // (Unix timestamp)
        "token": "TOKEN"
      }
      ```
  - Status 401:
    - ```json
      { "error": "Wrong API Key or API Secret." }
      ```
  - Status 404:
    - ```json
      { "error": "Utility not found." }
      ```
