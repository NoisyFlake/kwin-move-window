#!/bin/bash
kwriteconfig5 --file kwinrc --group Plugins --key kwin-move-windowEnabled false
qdbus org.kde.KWin /KWin reconfigure

kpackagetool5 --type=KWin/Script -u ./
sleep 1

kwriteconfig5 --file kwinrc --group Plugins --key kwin-move-windowEnabled true
qdbus org.kde.KWin /KWin reconfigure