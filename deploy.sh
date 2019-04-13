#!/bin/sh

mkdir -p ~/.lftp
echo "set dns:order inet" >> ~/.lftp/rc
echo "set ssl:check-hostname no" >> ~/.lftp/rc
echo "set ssl:verify-certificate no" >> ~/.lftp/rc

FTP_HOME_URL="ftp://$FTP_HOME_USER:$FTP_HOME_PASS@$FTP_HOME_HOST"
FTP_MATHE_URL="ftp://$FTP_MATHE_USER:$FTP_MATHE_PASS@$FTP_MATHE_HOST"

lftp -c "
  set ftp:list-options -a;
  open '$FTP_HOME_URL';
  lcd ./dist/home;
  cd /$FTP_HOME_USER;
  mirror --reverse \
         --delete \
         --ignore-time \
         --exclude-glob .git* \
"

lftp -c "
  set ftp:list-options -a;
  open '$FTP_MATHE_URL';
  lcd ./dist/mathe;
  cd /$FTP_MATHE_USER;
  mirror --reverse \
         --delete \
         --ignore-time \
         --exclude-glob .git* \
"
