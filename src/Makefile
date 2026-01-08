NAME = computor

all: $(NAME)

$(NAME):	
	if [ ! -d node_modules ]; then npm init -y; fi
	npm i
	echo '#!/bin/sh' > computor
	echo 'node ./computor.js "$$@"' >> computor
	chmod +x ./computor

clean:
	rm -f $(NAME)

fclean: clean
	rm -rf node_modules
	rm -rf package-lock.json
	rm -rf package.json

re: fclean all

.PHONY: ALL clean fclean re