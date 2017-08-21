import random

import tweepy
from flask import Flask
from flask import render_template,request
from textblob import TextBlob

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/getemotion',methods=['GET'])
def getemotion():
    # calling function to get tweets
    # get the values from the form to be input in the sentiment analysis engine
    statement = request.args.get('input')
    print("this is the statement"+statement)
    tweets = get_tweets(str(statement))

    # picking positive tweets from tweets
    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
    # percentage of positive tweets
    positive = (100 * len(ptweets) / len(tweets))
    # picking negative tweets from tweets
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
    # percentage of negative tweets
    negative = (100 * len(ntweets) / len(tweets))
    # percentage of neutral tweets
    #neutral = (100 * (len(tweets) - len(ntweets) - len(ptweets)) / len(tweets))

    print positive
    print negative

    if positive == 100:
        return 'positive'
    elif negative == 100:
        return 'negative'
    else:
        return 'neutral'


def get_tweet_sentiment(tweet):
    # create TextBlob object of passed tweet text
    analysis = TextBlob(tweet)
    # set sentiment
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity == 0:
        return 'neutral'
    else:
        return 'negative'


def get_tweets(statement):
    # empty list to store parsed tweets
    tweets = []
    input = []
    input.append(statement)
    try:
        # call twitter api to fetch tweets
        fetched_tweets = input

        # parsing tweets one by one
        for tweet in fetched_tweets:
            # empty dictionary to store required params of a tweet
            parsed_tweet = {}
            # saving text of tweet
            parsed_tweet['text'] = tweet
            # saving sentiment of tweet
            parsed_tweet['sentiment'] = get_tweet_sentiment(tweet)

            # appending parsed tweet to tweets list
            tweets.append(parsed_tweet)

            # return parsed tweets
        return tweets

    except tweepy.TweepError as e:  # print error (if any)
        print("Error : " + str(e))


if __name__ == '__main__':
    app.run()
