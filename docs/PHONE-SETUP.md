# أوامر تثبيت AN TV من الجوال والكمبيوتر

هذه أوامر AN TV فقط؛ لا تنسخ مستودع UrTV أو تشغّل سكربتاته. نفس شبكة التلفزيون وتصحيح مفعّل وموافقة بالريموت مطلوبة. أوامر التثبيت تفتح المعالج؛ أكمل البدء في التجهيز لحفظ إعداد الرجوع وتعيين الرئيسية.

## أندرويد: أدوات Termux

```sh
pkg update && pkg install android-tools curl
```

## أندرويد: تثبيت AN TV

```sh
printf 'TV IP (example 192.168.0.20): '
IFS= read -r AN_TV_IP
AN_TV_TARGET="${AN_TV_IP}:5555"
adb connect "$AN_TV_TARGET" &&
adb -s "$AN_TV_TARGET" get-state &&
curl -fL --proto '=https' -o AN-TV.apk 'https://github.com/aij17/AN-TV-Installer/releases/latest/download/AN-TV.apk' &&
adb -s "$AN_TV_TARGET" install -r AN-TV.apk &&
adb -s "$AN_TV_TARGET" shell am start -n com.antv.tv/com.antv.setup.SetupActivity
```

## آيفون: أدوات iSH — تجريبي وغير مختبر على آيفون فعلي

```sh
apk update && apk add curl android-tools && command -v adb
```

## آيفون: لا تنفّذ إلا بعد توفر adb

```sh
printf 'TV IP (example 192.168.0.20): '
IFS= read -r AN_TV_IP
AN_TV_TARGET="${AN_TV_IP}:5555"
adb connect "$AN_TV_TARGET" &&
adb -s "$AN_TV_TARGET" get-state &&
curl -fL --proto '=https' -o AN-TV.apk 'https://github.com/aij17/AN-TV-Installer/releases/latest/download/AN-TV.apk' &&
adb -s "$AN_TV_TARGET" install -r AN-TV.apk &&
adb -s "$AN_TV_TARGET" shell am start -n com.antv.tv/com.antv.setup.SetupActivity
```

## ماك ولينكس: Terminal داخل platform-tools

```sh
export PATH="$PWD:$PATH"
printf 'TV IP (example 192.168.0.20): '
IFS= read -r AN_TV_IP
AN_TV_TARGET="${AN_TV_IP}:5555"
adb connect "$AN_TV_TARGET" &&
adb -s "$AN_TV_TARGET" get-state &&
curl -fL --proto '=https' -o AN-TV.apk 'https://github.com/aij17/AN-TV-Installer/releases/latest/download/AN-TV.apk' &&
adb -s "$AN_TV_TARGET" install -r AN-TV.apk &&
adb -s "$AN_TV_TARGET" shell am start -n com.antv.tv/com.antv.setup.SetupActivity
```

## ويندوز: PowerShell داخل platform-tools

```powershell
$anTvAdb = Join-Path (Get-Location) 'adb.exe'
if (!(Test-Path $anTvAdb)) { throw 'Open PowerShell inside platform-tools first.' }
$anTvIp = Read-Host 'TV IP (example 192.168.0.20)'
$anTvTarget = "$($anTvIp):5555"
& $anTvAdb connect $anTvTarget
& $anTvAdb -s $anTvTarget get-state
if ($LASTEXITCODE -ne 0) { throw 'Approve debugging on TV, then retry.' }
Invoke-WebRequest -Uri 'https://github.com/aij17/AN-TV-Installer/releases/latest/download/AN-TV.apk' -OutFile 'AN-TV.apk'
& $anTvAdb -s $anTvTarget install -r 'AN-TV.apk'
if ($LASTEXITCODE -ne 0) { throw 'Installation failed; stop here.' }
& $anTvAdb -s $anTvTarget shell am start -n 'com.antv.tv/com.antv.setup.SetupActivity'
```

## الاقتران اللاسلكي: أندرويد أو ماك ولينكس

```sh
printf 'Pair address (IP:pair-port): '
IFS= read -r AN_TV_PAIR
adb pair "$AN_TV_PAIR" &&
printf 'Connect address (IP:connect-port): ' &&
IFS= read -r AN_TV_CONNECT &&
adb connect "$AN_TV_CONNECT" &&
adb -s "$AN_TV_CONNECT" tcpip 5555
```

أدخل عنوان IP فقط عند TV IP. للاتصال اللاسلكي أدخل IP:منفذ الاقتران ثم رمزه، وبعده IP:منفذ الاتصال. بعد نجاح tcpip 5555 نفذ أوامر التثبيت المباشر.

الروابط الرسمية: [Termux](https://f-droid.org/packages/com.termux/) · [iSH](https://ish.app/) · [Platform Tools](https://developer.android.com/tools/releases/platform-tools) · [LocalSend](https://localsend.org/download).

مسار iSH قد لا يوفر android-tools. إذا تعذر استخدامه، أكمل من متصفح الجوال أو التلفزيون. لم يُختبر تشغيل الأوامر على iSH أو PowerShell فعلي؛ فُحصت صياغة أوامر shell ومسار النجاح والفشل بمحاكاة ADB.
