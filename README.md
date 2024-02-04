# Pulse
 
Pulse is a simple and configurable tool for testing WebSocket connections. It provides an easy-to-use interface to send and receive WebSocket messages, making it convenient for developers and testers to validate WebSocket functionality.

## Features
Connect to WebSocket Server: Easily connect to WebSocket servers for testing.

Send and Receive Messages: Send and receive WebSocket messages with configurable options.

Real-time Feedback: View real-time responses and messages in the user-friendly interface.

User-friendly Interface: Simple and intuitive interface for easy testing.
## Configuration Options

```json
{
  "app": {
    "webSockets": {
      "items": [
        {
          "name": "datastore",
          "serverName": "ws://LAPTOP-UMF83CB2:8007/ws-endpoint",
          "topic": "/topic/queryAsync"
        },
        {
          "name": "healthcheck",
          "serverName": "ws://LAPTOP-UMF83CB2:8009/ws-endpoint1",
          "topic": "/topic/healthCheck"
        }
      ]
    }
  }
}

```
![image](https://github.com/jpothanc/pulse/assets/70871841/0f72337b-08a2-4083-8e59-ee192a693c59)

