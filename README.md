# D-logger-node

Библиотека для ведения журнала логирования JS/Vue приложений. 
Является расширением библиотеки [**@dlabs71/d-logger**](https://github.com/dlabs71/d-logger#readme).
Предоставляет возможность логирования в файл по средствам предоставляемого `FileAppender` и методов управления данными 
файлами в расширенном классе `DLogger`.

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][license-url]

# Установка NPM

```sh
npm i @dlabs71/d-logger-node
```

# Использование

Данная библиотека может быть использована в любом js приложении, вне зависимости от фреймворка. Также она предоставляет
поддержку подключения к Vue.js приложению через плагин.

## Подключение к Vue.js приложению

Для использования d-logger-node во Vue приложении, импортируйте `DLoggerPlugin` или `DLoggerNodePlugin` плагин и подключите его.
Все параметры плагина соответствуют плагину `DLoggerPlugin` из библиотеки [@dlabs71/d-logger](https://github.com/dlabs71/d-logger#readme).

**`main.js`**

```js
import { DLoggerPlugin } from '@dlabs71/d-logger-node';

Vue.use(DLoggerPlugin);
// or
const loggerOpts = {
    level: "info"
};
Vue.use(DLoggerPlugin, {
    logConfig: loggerOpts
});
```

Параметры настройки плагина:

| **Параметр** | **Тип**   | **Значение по умолчанию** | **Описание**
| :------------| :---------| :-------------------------| :-------------------------------------
| level        | string    | debug                     | Устанавливает уровень логирования | 
| template     | function  | null                      | Функция определяющая шаблон строки логирования ([шаблоны](https://github.com/dlabs71/d-logger#section31)) | 
| appenders    | array     | []                        | Список апендеров, реализующих класс `LogAppender`. По умолчанию сразу доступен `ConsoleAppender` ([аппендеры](https://github.com/dlabs71/d-logger#section2))|
| stepInStack  | number    | 6                         | Индекс в стеке вызовов ошибки для определения файла и позиции вызова метода логирования. Если библиотека показывает не верный файл вызова метода логирования, то необходимо поменять данный параметр.
| dateL10n     | string    | en                        | Локализация даты в логах (en, ru, ...). Для всех аппендеров по умолчанию. |

Далее вы можете использовать её через `this.$log` как в примере ниже:

**`example.vue`**

```vue

<template></template>
<script>
export default {
    name: 'example',
    methods: {
        process() {
            this.$log.debug("Starting method process");
            // code method
            this.$log.debug("Ending method process");
        }
    }
}
</script>
```

## Использование логгера без плагина Vue.js

Для использования логгера без плагина Vue.js достаточно импортировать `$log` из `@dlabs71/d-logger-node`. Вы получаете,
настроенный по умолчанию, экземпляр класса `DLoggerNode`. Он будет использовать `ConsoleAppender` в качестве единственного
и основного аппендера логирования ([Логгер](https://github.com/dlabs71/d-logger#section2)).

```js
import {$log} from '@dlabs71/d-logger-node';

function exampleFunc(param1, param2) {
    $log.info("Start exampleFunc with parameters: param1 = ", param1, ", param2 = ", param2);
}
```

Логгер можно перенастроить, для этого есть метод `configure`. Про его использование читайте в
документации проекта `@dlabs71/d-logger` [Метод configure](https://github.com/dlabs71/d-logger#section221).

```js
import {$log} from '@dlabs71/d-logger-node';

$log.configure({
    level: "error"
});

function exampleFunc(param1, param2) {
    $log.info("Start exampleFunc with parameters: param1 = ", param1, ", param2 = ", param2);
}
```

Более подробную документацию читайте в разделе [Документация](#Документация) текущего проекта 
и в разделе [Документация проекта @dlabs71/d-logger](https://github.com/dlabs71/d-logger#%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F)

# Документация

## Оглавление

* [1. Расширенный логгер - DLoggerNode](#section1)
    * [1.1 Методы конфигурации и управления аппендерами](#section11)
        * [1.1.1 Метод addFileAppender](#section111)
        * [1.1.2 Метод getFileAppenders](#section112)
        * [1.1.3 Метод existFileAppender](#section113)
        * [1.1.4 Метод deleteAllFileLogs](#section114)

## <h2 id="section1">1. Расширенный логгер - DLoggerNode</h2>

Логгер представляет собой экземпляр класса `DLoggerNode`, который наследует класс `DLogger` из библиотеки [@dlabs71/d-logger](https://github.com/dlabs71/d-logger#section2). 
Для управления журналом логирования существуют специальные классы, наследующие класс `LogAppender` (далее аппендеры). 
Данная библиотека предоставляет аппендер, позволяющий логировать в файлы.

* **`FileAppender`** - аппендер использующий файлы для записи событий логирования

Наряду со стандартными методами `DLogger`, про которые можно прочитать [здесь](https://github.com/dlabs71/d-logger#section2). 
`DLoggerNode` предоставляет ряд дополнительных методов для работы с `FileAppender`. 


### <h3 id="section21">1.1 Методы конфигурации и управления аппендерами</h3>

#### <h4 id="section211">1.1.1 Метод addFileAppender</h4>

Метод для добавления `FileAppender`. Параметры функции описаны в таблице ниже

| **Параметр**    | **Тип**  | **Значение по умолчанию**   | **Описание**
| :---------------| :--------| :---------------------------| :-------------------------------------
| pathToDir       | string   |                             | **Обязательное для заполнения.** Путь до директории лог файлов.
| isRotatingFiles | boolean  | false                       | Активация механизма ротации файлов (удаление старых файлов)
| filePrefix      | string   | null                        | Префикс для файлов логирования
| level           | string   | null                        | Устанавливает уровень логирования аппендера
| template        | function | null                        | Функция определяющая шаблон строки логирования аппендера ([шаблоны](https://github.com/dlabs71/d-logger#section31)).
| stepInStack     | number   | config.stepInStack          | Индекс в стеке вызовов ошибки для определения файла и позиции вызова метода логирования. Если библиотека показывает не верный файл вызова метода логирования, то необходимо поменять данный параметр.

Пример использования:

```js
import {$log} from '@dlabs71/d-logger-node';

$log.addFileAppender('/var/log/app', true);
```

#### <h4 id="section212">1.1.2 Метод getFileAppenders</h4>

Метод для получения списка всех `FileAppender-ов`.

```js
import {$log} from '@dlabs71/d-logger-node';

$log.addFileAppender('/var/log/app', true);
let fileAppenders = $log.getFileAppenders();
// fileAppenders = [FileAppender] 
```

#### <h4 id="section213">1.1.3 Метод existFileAppender</h4>

Метод для проверки существования `FileAppender-ов` в списке аппендеров

```js
import {$log} from '@dlabs71/d-logger-node';

$log.addFileAppender('/var/log/app', true);
let exist = $log.existFileAppender();
// exist = true
```

#### <h4 id="section214">1.1.4 Метод deleteAllFileLogs</h4>

Метод для удаления всех лог файлов

```js
import {$log} from '@dlabs71/d-logger-node';

$log.addFileAppender('/var/log/app', true);
$log.deleteAllFileLogs();
```

Больше информации можно найти в разделе [Документация проекта @dlabs71/d-logger](https://github.com/dlabs71/d-logger#%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F)

[npm-image]: https://img.shields.io/npm/v/@dlabs71/d-logger-node

[npm-url]: https://www.npmjs.com/package/@dlabs71/d-logger-node

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg

[license-url]: LICENSE
