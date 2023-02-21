
# APPLICATION DE GESTION DE TOURNOIS D'ECHEC


## Avertissements

Cette application s'exécute dans la console et permet de gérer des tournois d'échecs. 
Son développement respecte le Design Pattern MVC (modèle vue controleur)  

## Mise en place et exécution de l'application

1. Téléchargez le projet depuis Github. Soit directement (format zip), soit en clonant le projet en utilisant la commande suivante dans Git Bash :  
```
git clone <URL du repo>
```
2. Créez un environnement virtuel Python en exécutant la commande suivantes dans le Terminal de votre choix :
```
python -m venv env (env étant le nom de l'environnement, vous pouvez le changer)
```
Puis, toujours dans le terminal, activez votre environnement avec la commande suivante si vous êtes sous Linux :
```
source env/bin/activate
```
Ou bien celle-ci si vous êtes sous Windows
```
env/Scripts/activate.bat
```
3. Téléchargez les packages Python nécessaires à la bonne exécution du script à l'aide de la commande suivante :
```
pip install -r requirements.txt
```
4. Vous pouvez maintenant exécuter l'application, soit à l'aide de l'IDE de votre choix, soit directement depuis le Terminal, à l'aide de la commande suivante :
```		
python main.py
```
5. L'application se compose d'une suite de menu successif, chaque menu indiquant les actions possibles. Les différentes actions s'éxécutent en tapant un caractère dans la console puis la touche Entrée. 
 
 
NB : Pour générer un nouveau rapport flake8 vous confirmant que le code est conforme à la PEP8, utilisez la commande suivante :
```		
flake8 --exclude=env --max-line-length=119 --format=html --htmldir=<nom du rapport à générer>
```


