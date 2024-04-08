package com.moview_review.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.moview_review.documents.Movie;
import com.moview_review.documents.Review;
import com.moview_review.repositories.ReviewRespository;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRespository reviewRepo;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Review createReview(String reviewBody, String imdbId) {
		Review review = reviewRepo.insert(new Review(reviewBody));
		
		mongoTemplate.update(Movie.class)
					 .matching(Criteria.where("imdbId").is(imdbId))
					 .apply(new Update().push("reviewIds").value(review))
					 .first();
		return review;
	}
}
