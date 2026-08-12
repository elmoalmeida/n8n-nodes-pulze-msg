# Branch `dist-tarball`

Só o pacote já construído (`.tgz`), para instalar direto num n8n sem passar
pelo npm — instalar do git faria o npm tentar *preparar* o pacote, o que
instala todas as devDependencies (incluindo o n8n inteiro e o `isolated-vm`,
que exige Python/node-gyp) e falha em containers enxutos.

O código-fonte está na branch `main`. Esta branch é temporária, para testes
antes da publicação no npm.

## Instalar

Dentro do container do n8n:

```sh
mkdir -p /home/node/.n8n/custom && cd /home/node/.n8n/custom
npm init -y   # só na primeira vez, se ainda não houver package.json
npm install https://github.com/elmoalmeida/n8n-nodes-pulze-msg/raw/dist-tarball/n8n-nodes-pulze-msg-0.1.0.tgz
```

Depois reinicie o n8n — a pasta `~/.n8n/custom` é escaneada na inicialização.
