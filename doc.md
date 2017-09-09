Pastas
---
criar pasta pública
>create={name}

criar pasta privada
>create={name}&user={user}&password={password}

acessar pasta privada
>login={name}&user={user}&password={password}

criar modelo
---
>model={name}&

Nome do Modelo: String [a-z_-]

>field={field}&

Campo: String [a-z_-]
>type={type}&

Tipo: ('integer','numeric','text')

>maxlength={number}&

Caracteres Maximos: Integer|0=maxlength not set

>minlength={number}&

Caracteres Minimo: Integer|0=minlength not set

>default={default}& (empty|{text})


>unique={boolean}&
>
>required={boolean}&
>
>index={field}

GET

WHERE =


//is array => context = AND
[
  ["email","diego@denv.com.br"],
  ["password","1234"]
]

//is object = key[0] = context ('and','or','xor')
{
  or:[
    ["email","*","diego"],
    ["email","*","diogo"]
  ]
}
