# TNEU News Back-end

# How it works

This is 1 Lambda function with 3 GB of RAM.

* Runs every hour
* Concurrently scrapes all the TNEU newsfeed from scratch using [@tneu/news](https://github.com/tneudevteam/tneu-news) library
* Puts everything into new [Algolia](https://www.algolia.com/) search index
* Swaps old index with the new one

# Demo
