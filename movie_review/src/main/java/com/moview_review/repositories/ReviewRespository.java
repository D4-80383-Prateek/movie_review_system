package com.moview_review.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.moview_review.documents.Review;

@Repository
public interface ReviewRespository extends MongoRepository<Review, ObjectId>{

}
