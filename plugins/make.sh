#!/bin/bash
kango build ./Yabs

cp ./Yabs/output/*.xpi .
cp ./Yabs/output/*.crx .
cp ./Yabs/output/*.zip .

ls *.xpi *.crx *.zip
