package com.andtors.CRUD.domain.exception;

public class ValidationException extends RuntimeException{
    public ValidationException (String message){
        super(message);
    }
}
