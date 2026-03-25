# 📞 Voice Agent Peach (Twilio + Ultravox AI)

Um servidor Node.js projetado para receber chamadas telefônicas via Twilio e conectá-las a uma inteligência artificial de voz operada pela **Ultravox AI**. Neste projeto, o agente virtual assume a persona da "Peach", uma vendedora e especialista em jogos e consoles da Nintendo.

## 🚀 Sobre o Projeto
Essa aplicação integra telefonia e IA conversacional em tempo real. Quando um usuário liga para o número configurado no Twilio, o servidor local (`server.js`) recebe o webhook e gera uma resposta de voz XML (`TwiML`). A ligação é então transmitida (stream) de forma contínua para o modelo de voz interativo da Ultravox AI, permitindo uma conversa fluida, natural e baseada em contexto com o seu cliente.

## 🛠 Tecnologias Utilizadas
- **[Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)** - Criação do servidor backend rápido e do endpoint de integração webhook.
- **[Twilio](https://www.twilio.com/)** - Gerenciamento do número de telefone e recepção das chamadas através do `twiml.VoiceResponse()`.
- **[Ultravox AI](https://ultravox.ai/)** - IA baseada no modelo `fixie-ai/ultravox` configurada especificamente com `voice: 'Keren-Brasileiro-Português'` para conversação realista nacional.

## ⚙️ Principais Funcionalidades
- **Integração Real-Time**: Conexão WebSocket para processar e responder o áudio da ligação quase sem latência com a API Ultravox.
- **Persona Customizada**: *System Prompt* detalhado onde a IA se comporta como vendedora de produtos como Nintendo Switch, 3DS, Joy-Cons, Mario Kart 8 Deluxe e Amiibos.
- **Webhook Descomplicado**: Rota `/incoming` pronta para ser acoplada no dashboard de chamadas do Twilio.

## 🚀 Como Executar Localmente

**1. Clone o Repositório**
```bash
git clone https://github.com/Cairo-Carneiro/Ultravoxtt.git
cd Ultravoxtt
```

**2. Instale as Dependências**
Se necessário, caso o projeto base não possua o pacote inicializado localmente, instale ativando o npm:
```bash
npm install express twilio https
```

**3. Configure suas Chaves de Segurança**
No arquivo `server.js`, adicione a sua chave de acesso gerada na Ultravox na variável dedicada:
```javascript
const ULTRAVOX_API_KEY = 'SUA_CHAVE_API_AQUI';
```

*(💡 Dica: Para testar localmente conectando ao Twilio na nuvem, você pode expor sua porta com o [ngrok](https://ngrok.com/) rodando `ngrok http 3000`)*

**4. Inicie o Servidor**
```bash
node server.js
```
O servidor responderá indicando que está operante na porta `3000`.

## 🤝 Próximos Passos e Melhorias (Produção)
- [ ] Isolar as chaves sensíveis como `ULTRAVOX_API_KEY` para um arquivo de ambiente oculto (`.env`).
- [ ] Implementar captura e registro (logs) do texto da conversa em um banco de dados de vendas.
- [ ] Integrar com uma API falsa de e-commerce simulando processamentos de pedidos que a "Peach" registrar.

---
✨ Criado para testar e validar o forte potencial comercial de inteligências artificiais focadas em Vendas por Voz e Telefonia.
